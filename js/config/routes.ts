import { loadEditor } from "../editor.js";
import { loadThumbnail } from "../thumbnail.js";
interface IRouteObject{
  name: string,
  path?: RegExp,
  url?: string,
  loaderJs?:Function,
  cssFile?:string,
  template?:string,
  message?:string,
  status?:number,
  statusText?:string
}
export const routes:Array<IRouteObject> = [
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
    }
  ];