interface MDXMetaData {
  title: string;
  desc: string;
}

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  let meta: MDXMetaData;
  export default MDXComponent;
  export { meta };
}
