import { DisTube, SearchResultVideo } from "distube";

const yts = require('yt-search');

export class SearchYoutube {

    async searchYoutube(distube: DisTube, args: string[]): Promise<SearchResultVideo[]>{
        return  await distube.search(args.join(""),{
            limit:1
        });
    }
}