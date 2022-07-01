import CPPIcon from "../../assets/cpp.png";
import JSIcon from "../../assets/JS.png";
import TSIcon from "../../assets/TS.png";
import QTIcon from "../../assets/QT.png";
import NODEIcon from "../../assets/Node.png";
import NEXTIcon from "../../assets/NEXT.png";
import REACTIcon from "../../assets/REACT.png";
import FirebaseIcon from "../../assets/Firebase.png";
import MongoIcon from "../../assets/Mongo.png";
import WINIcon from "../../assets/WIN.png";
import LINUXIcon from "../../assets/LINUX.png";
import ProjectImage from "../../assets/Project.jpg";
import ClgWebImage from "../../assets/clg-website.jpg";
import LinkShortImage from "../../assets/link-short.png";
import DeskEntryImage from "../../assets/desktop-entry.png";
import TestPostImage from "../../assets/test-post.png";
import NetflixImage from "../../assets/netflix.jpg";
import TailWindIcon from "../../assets/tailwind.png";
import HtmlIcon from "../../assets/html.png";
import CssIcon from "../../assets/css.png";
import BootStrapIcon from "../../assets/bootstrap.png";
import AppleIcon from "../../assets/apple.png";
import AndroidIcon from "../../assets/android.png";

import { StaticImageData } from "next/image";

export interface IProjectTechStack {
  title: string;
  items: StaticImageData[];
}

export interface IProject {
  id: number;
  title: string;
  img: StaticImageData;
  techStack: IProjectTechStack[];
  github?: string;
  liveLink?: string;
}

const projects: IProject[] = [
  {
    id: 0,
    title: "Image Compressor",
    img: ProjectImage,
    techStack: [
      {
        title: "Langauges",
        items: [CPPIcon],
      },
      {
        title: "Frameworks",
        items: [QTIcon],
      },
      {
        title: "OS",
        items: [WINIcon, LINUXIcon],
      },
    ],
    github: "https://github.com/adnan007d/ImageCompressor",
    liveLink: "https://github.com/adnan007d/ImageCompressor/releases/tag/v2.0",
  },
  {
    id: 1,
    title: "College Website",
    img: ClgWebImage,
    techStack: [
      {
        title: "Langauges",
        items: [HtmlIcon, CssIcon, JSIcon],
      },
      {
        title: "Frameworks",
        items: [BootStrapIcon],
      },
      {
        title: "OS",
        items: [WINIcon, LINUXIcon, AndroidIcon, AppleIcon],
      },
    ],
    // github: "https://github.com/adnan007d/ImageCompressor",
    liveLink: "https://rdnational.ac.in",
  },
  {
    id: 2,
    title: "Link Shortener",
    img: LinkShortImage,
    techStack: [
      {
        title: "Langauges",
        items: [TSIcon],
      },
      {
        title: "Frameworks",
        items: [NEXTIcon, NODEIcon, TailWindIcon],
      },
      {
        title: "Database",
        items: [MongoIcon],
      },
      {
        title: "OS",
        items: [WINIcon, LINUXIcon],
      },
    ],
    github: "https://github.com/adnan007d/link-shortner",
    liveLink: "https://link-shortner-adnan007d.vercel.app/",
  },
  {
    id: 3,
    title: "Desktop Entry",
    img: DeskEntryImage,
    techStack: [
      {
        title: "Langauges",
        items: [CPPIcon],
      },
      {
        title: "Frameworks",
        items: [QTIcon],
      },
      {
        title: "OS",
        items: [LINUXIcon],
      },
    ],
    github: "https://github.com/adnan007d/DesktopEntry",
    liveLink: "https://github.com/adnan007d/DesktopEntry/releases/tag/v1.0",
  },
  {
    id: 4,
    title: "Test Post",
    img: TestPostImage,
    techStack: [
      {
        title: "Langauges",
        items: [TSIcon],
      },
      {
        title: "Frameworks",
        items: [NEXTIcon, NODEIcon, TailWindIcon],
      },
      {
        title: "Database",
        items: [FirebaseIcon],
      },
      {
        title: "OS",
        items: [WINIcon, LINUXIcon, AndroidIcon, AppleIcon],
      },
    ],
    github: "https://github.com/adnan007d/test-post",
    liveLink: "https://test-post.vercel.app/",
  },
  {
    id: 5,
    title: "Netflix Clone",
    img: NetflixImage,
    techStack: [
      {
        title: "Langauges",
        items: [JSIcon],
      },
      {
        title: "Frameworks",
        items: [REACTIcon],
      },
      {
        title: "OS",
        items: [WINIcon, LINUXIcon, AndroidIcon, AppleIcon],
      },
    ],
    github: "https://github.com/adnan007d/netflix-clone",
    liveLink: "https://netflix-clone-007d.web.app/",
  },
];

export { projects };
