import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPodcast } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceFilterEpisodes = async (
  podcastName: string | undefined
): Promise<PodcastTransferModel> => {
  //define a interface de retorno
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  //buscando os dados
  const queryString = podcastName?.split("?podcastName=")[1] || "";    
  
  //Forma de pegar outros parametros na URL
  //const query = new URLSearchParams(podcastName);  
  //const podcastName = urlParams.get('podcastName');

  const data = await repositoryPodcast(queryString);

  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
    body: data,
  };

  return responseFormat;
};
