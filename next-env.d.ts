/// <reference types="next" />
/// <reference types="next/types/global" />
declare module "*.scss"
declare module "*.svg" {
    const content: any;
    export default content;
  }
