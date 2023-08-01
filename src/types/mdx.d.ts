declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  let meta: Record<string, any>;
  export default MDXComponent;
  export { meta };
}
