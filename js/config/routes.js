import { loadEditor } from "../editor.js";
import { loadThumbnail } from "../thumbnail.js";

export const routes = [
    {
      name: "Thumbnail",
      path: /^\/thumbnail$/,
      url: "/pages/thumbnail/thumbnail.html",
      loaderJs:loadThumbnail,
      cssFile:"/pages/thumbnail/thumbnail.css"
    },
    {
      name: "Editor",
      path: /^\/edit((\/)|(\/(?<id>\d+)))?$/,
      url: "/pages/editor/editor.html",
      loaderJs: loadEditor,
      cssFile:"/pages/editor/editor.css",
    },
    {
      name: "Home",
      path: /^\/?$/,
      url: "/pages/home/home.html",
    },
  ];