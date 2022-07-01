import CPPIcon from "../../assets/cpp.png";
import PYIcon from "../../assets/python.png";
import JSIcon from "../../assets/JS.png";
import TSIcon from "../../assets/TS.png";
import JAVAIcon from "../../assets/JAVA.png";
import QTIcon from "../../assets/QT.png";
import NODEIcon from "../../assets/Node.png";
import NEXTIcon from "../../assets/NEXT.png";
import REACTIcon from "../../assets/REACT.png";
import FirebaseIcon from "../../assets/Firebase.png";
import MongoIcon from "../../assets/Mongo.png";
import SQLIcon from "../../assets/SQL.png";
import TailWindIcon from "../../assets/tailwind.png";

const languages = [
  {
    icon: CPPIcon,
    name: "C++",
  },
  {
    icon: PYIcon,
    name: "Python",
  },
  {
    icon: JSIcon,
    name: "JavaScript",
  },
  {
    icon: TSIcon,
    name: "TypeScript",
  },
  {
    icon: JAVAIcon,
    name: "Java",
  },
];

const frameworks = [
  {
    icon: QTIcon,
    name: "Qt",
  },
  {
    icon: NODEIcon,
    name: "Node.JS",
  },
  {
    icon: NEXTIcon,
    name: "NEXT.JS",
  },
  {
    icon: REACTIcon,
    name: "React.JS",
  },
  {
    icon: TailWindIcon,
    name: "Tailwind CSS",
  },
];

const databases = [
  {
    icon: FirebaseIcon,
    name: "Firebase",
  },
  {
    icon: MongoIcon,
    name: "MongoDB, (No SQL)",
  },
  {
    icon: SQLIcon,
    name: "SQL (Basics)",
  },
];

const techStack = [
  {
    title: "Languages I Speak",
    items: languages,
  },
  {
    title: "Frameworks I Use",
    items: frameworks,
  },
  {
    title: "Databases I Use",
    items: databases,
  },
];

export { frameworks, languages, databases, techStack };
