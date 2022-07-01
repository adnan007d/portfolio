import RedditIcon from "@mui/icons-material/Reddit";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { MailOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <footer className="h-60 mt-10 bg-[#1f2222a6] w-full grid place-items-center">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-purple-500 mb-5">Terrible Color Choices</h1>
        <div className="flex space-x-10">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/adnan007d"
          >
            <GitHubIcon className="text-white icon" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/an.eternity.of.misery"
          >
            <InstagramIcon className="text-[#bc2a8d] icon" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.reddit.com/user/AnEternityOfMisery"
          >
            <RedditIcon className="text-red-500 icon" />
          </a>
        </div>
        <div className="flex mt-3 items-center">
          <IconButton
            className="text-inherit"
            href="mailto:adnanmansuri54@gmail.com"
          >
            <MailOutlined />
          </IconButton>
          <h1 className="text-purple-400">adnanmansuri54@gmail.com</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
