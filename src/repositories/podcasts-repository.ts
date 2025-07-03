import fs from "fs";
import path from "path";

import { PodcastModel } from "../models/podcast-model";
import { FilterType } from "../utils/filter-type";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryPodcast = async (
  tag?:string, filter?: string
): Promise<PodcastModel[]> => {
  const language = "utf-8";

  const rawData = fs.readFileSync(pathData, language);
  let jsonFile = JSON.parse(rawData);

  if (filter) {    
    if(tag === FilterType.PODCASTNAME){
      jsonFile = jsonFile.filter((podcast: PodcastModel) => podcast.podcastName === filter);
    }

    if(tag === FilterType.CATEGORIE){
      jsonFile = jsonFile.filter((podcast: PodcastModel) => podcast.categories.some(categorie => categorie === filter))
    }
  }
  return jsonFile;
};
