---
title: Parsing IPv4 Addresses
description: 'Parsing IPv4 Address and comparing different approches'
type:
  - blog
tags:
  - parsing
  - optimization
published: true
date: 'November 09 2024'
---

The simplest way to parse or check if an IPv4 address is valid is to use `regex` which is not efficient.
You can find many different regex patterns for checking if a ipv4 address is valid.

With that thought I decided to do it myself without using regex.

## IPv4 Address

An IPv4 address is a 32-bit number that is written in the form of four 8-bit numbers separated by dots.

For example, `192.168.0.1`

The 32 bits are divided into four 8-bit numbers called octets.

A valid IPv4 address has the following format:

```
<octet>.<octet>.<octet>.<octet>
```

Where each octet is a number between 0 and 255.

### Ground rules

- Octet cannot start with leading `0` unless its the only digit in the octet.
  e.g.
  - `192.168.000.001` is not a valid IPv4 address.
  - `192.168.0.001` is not a valid IPv4 address.
  - `192.168.0.1` is a valid IPv4 address.

I will be using Golang throughout this blog

## Using Split Method

Basic length check.

```go
if len(ip) < 7 || len(ip) > 15 {
        return errors.New("invalid IP")
}
```

Split the IP by `.` and check if there are 4 octets only.

```go
octets := strings.Split(ip, ".")
if len(octets) != 4 {
        return errors.New("invalid IP")
}
```

Check if each octet is valid.

```go
for _, octet := range octets {
        // 01, 012 are not a valid octet of ip address
        // 0 is a valid octet of IP address
        if (len(octet) > 1 && octet[0] == '0') || (len(octet) < 1 || len(octet) > 3) {
                return errors.New("invalid IP")
        }

        n, err := strconv.ParseInt(octet, 10, 0)

        if err != nil {
                return errors.New("invalid IP")
        }

        if n < 0 || n > 255 {
                return errors.New("invalid IP")
        }
}
```

Full code

```go
func isValidIP_Split(ip string) error {

        // Basic check
        if len(ip) < 7 || len(ip) > 15 {
                return errors.New("invalid IP")
        }

        octets := strings.Split(ip, ".")

        // Should only have 4 octets
        if len(octets) != 4 {
                return errors.New("invalid IP")

        }

        for _, octet := range octets {
                if (len(octet) > 1 && octet[0] == '0') || (len(octet) < 1 || len(octet) > 3) {
                        return errors.New("invalid IP")
                }

                n, err := strconv.ParseInt(octet, 10, 0)

                if err != nil {
                        return errors.New("invalid IP")
                }

                if n < 0 || n > 255 {
                        return errors.New("invalid IP")
                }
        }

        return nil
}
```

## Using Single Pass Method

In this approach we are trying to do all the checks in single pass.

First step is to check if the IP is valid by checking the length of the IP.

```go
if len(ip) < 7 || len(ip) > 15 {
        return errors.New("invalid IP")
}
```

For each character in the IP we check if its a valid `digit` or `.`

If the character is a valid digit form a octet integer by ascii manipulation and maths.

> Get the ascii code of the character subtract ascii code of `0` (48) which gives the exact value of the digit
> E.g. `1` is `49` in ascii code | 49 - 48 = 1
>
> E.g. `9` is `57` in ascii code | 57 - 48 = 9

> In each step we multiply the octet integer by 10 and add the calculated digit to it
>
> E.g. Converting '123' to integer
>
> int_val = 0
>
> int_val = int_val \* 10 + 1 // val = 1
>
> int_val = int_val \* 10 + 2 // val = 12
>
> int_val = int_val \* 10 + 3 // val = 123

```go
// Must be a valid numeric digit
if ip[i] < '0' || ip[i] > '9' {
        return errors.New("invalid IP")
}

// .001, .01 -> Invalid Octet
// .0 -> Valid Octet
if octetLen == 0 && ip[i] == '0' && i+1 < end && ip[i+1] != '.' {
        return errors.New("invalid IP")
}

// Basic logic to convert string to int
octet = octet*10 + int(ip[i]-'0')
octetLen += 1

// A octet length check to avoid over calcuating as its an invalid IP
if octetLen > 3 {
        return errors.New("invalid Ip")
}
```

If a character is `.` or end of the string then we check

- if the octet length is valid
- if the octet value is valid
- increment octets count
- reset octet length and octet value
- if end of the string then break else continue

```go
if end == i || ip[i] == '.' {
        octets += 1
        if octetLen < 1 || octetLen > 3 {
                // Invalid octet length
                return errors.New("invalid IP")
        }

        if octet < 0 || octet > 255 {
                // Invalid octet value
                return errors.New("invalid IP")
        }

        if i == end {
                break
        }

        octetLen = 0
        octet = 0
        continue // No further processing as '.'
}
```

Full code

```go
func isValidIP_SinglePass(ip string) error {
        if len(ip) < 7 || len(ip) > 15 {
                return errors.New("invalid IP")
        }

        end := len(ip)
        octets := 0
        octet := 0
        octetLen := 0

        for i := 0; octets <= 4; i++ {
                if end == i || ip[i] == '.' {
                        octets += 1
                        if octetLen < 1 || octetLen > 3 {
                                return errors.New("invalid IP")
                        }

                        if octet < 0 || octet > 255 {
                                return errors.New("invalid IP")
                        }

                        if i == end {
                                break
                        }

                        octetLen = 0
                        octet = 0
                        continue
                }

                if ip[i] < '0' || ip[i] > '9' {
                        return errors.New("invalid IP")
                }

                if octetLen == 0 && ip[i] == '0' && i+1 < end && ip[i+1] != '.' {
                        return errors.New("invalid IP")
                }

                octet = octet*10 + int(ip[i]-'0')
                octetLen += 1

                if octetLen > 3 {
                        return errors.New("invalid Ip")
                }
        }

        if octets != 4 {
                return errors.New("invalid IP")
        }

        return nil
}
```

## Built In

`net` package has a function `ParseIP` that validates if a provided string is a valid ip (ipv4/ipv6)

```go
ip := net.ParseIP("192.168.0.1")
```

## Regex

Well there are multiple regexes the one I have used is

```regex
^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$
```

## Conclusion & Benchmark

```bash
cpu: AMD Ryzen 5 4600H with Radeon Graphics
BenchmarkIPParser_DefaultGateway_Naive-12            	 6722538	       220.6 ns/op
BenchmarkIPParser_DefaultGateway_SinglePass-12       	53629252	        24.31 ns/op
BenchmarkIPParser_DefaultGateway_BuiltIn-12          	41368957	        26.63 ns/op
BenchmarkIPParser_DefaultGateway_Regex-12            	 2104970	       542.4 ns/op
BenchmarkIPParser_BigString_Naive-12                 	29841490	        46.53 ns/op
BenchmarkIPParser_BigString_SinglePass-12            	22988731	        49.51 ns/op
BenchmarkIPParser_BigString_BuiltIn-12               	11793058	       119.3 ns/op
BenchmarkIPParser_BigString_Regex-12                 	 8999227	       140.0 ns/op
BenchmarkIPParser_ValidLengthNumber_Naive-12         	12907652	       108.2 ns/op
BenchmarkIPParser_ValidLengthNumber_SinglePass-12    	20369660	        54.73 ns/op
BenchmarkIPParser_ValidLengthNumber_BuiltIn-12       	15580508	        87.94 ns/op
BenchmarkIPParser_ValidLengthNumber_Regex-12         	 6436222	       186.0 ns/op
BenchmarkIPParser_MaxValid_Naive-12                  	 5839047	       241.5 ns/op
BenchmarkIPParser_MaxValid_SinglePass-12             	38969929	        31.07 ns/op
BenchmarkIPParser_MaxValid_BuiltIn-12                	28567866	        35.58 ns/op
BenchmarkIPParser_MaxValid_Regex-12                  	 3489681	       401.8 ns/op
PASS
```

As you can see the built in and single pass methods are the fastest, followed by the naive method. As expected, the regex is the slowest.

Well just use the built in `net.ParseIP` method, it's fast and also handles ipv6 addresses.

If you are a graph enjoyer

<img width="800" height="460" class="max-w-full mx-auto" src="https://utfs.io/f/QPqXv0o0mVZLvy98aF4Dp9Kwo7rFRn5Tum6X01f2aEJqZCjM" alt="benchmark">

- BigString = "aslduasodusadiusoaiudowaiuoiuasdlsakjdlsakhdaklsjhdajsdkajsgdkasdk"
- DefaultGateway = "192.168.0.1"
- MaxValid = "255.255.255.255"
- ValidLengthNumber = "000000000"
