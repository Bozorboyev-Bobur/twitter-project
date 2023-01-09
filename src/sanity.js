import { createClient } from "next-sanity";

export const config = {

  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: '3n1slelw',
  apiVersion: '2021-10-21',

  useCdn: process.env.NODE_ENV === 'production',
}

export const sanityClient = createClient(config);