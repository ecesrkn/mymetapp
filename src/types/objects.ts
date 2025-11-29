export type MetObject = {
  objectID: number
  isHighlight: boolean
  accessionNumber: string
  accessionYear: string
  isPublicDomain: boolean
  primaryImage: string
  primaryImageSmall: string
  additionalImages: any[]
  constituents: Constituent[]
  department: string
  objectName: string
  title: string
  culture: string
  period: string
  dynasty: string
  reign: string
  portfolio: string
  artistRole: string
  artistPrefix: string
  artistDisplayName: string
  artistDisplayBio: string
  artistSuffix: string
  artistAlphaSort: string
  artistNationality: string
  artistBeginDate: string
  artistEndDate: string
  artistGender: string
  artistWikidata_URL: string
  artistULAN_URL: string
  objectDate: string
  objectBeginDate: number
  objectEndDate: number
  medium: string
  dimensions: string
  measurements: any
  creditLine: string
  geographyType: string
  city: string
  state: string
  county: string
  country: string
  region: string
  subregion: string
  locale: string
  locus: string
  excavation: string
  river: string
  classification: string
  rightsAndReproduction: string
  linkResource: string
  metadataDate: string
  repository: string
  objectURL: string
  tags: any
  objectWikidata_URL: string
  isTimelineWork: boolean
  GalleryNumber: string
}

export type Constituent = {
  constituentID: number
  role: string
  name: string
  constituentULAN_URL: string
  constituentWikidata_URL: string
  gender: string
}

export type GetObjectsResponseData = {
  total: number,
  objectIDs: number[]
}

export type MetSearchParams = {
  q?: string;                        // Search term
  isHighlight?: boolean;              // true or false
  title?: boolean;                    // true or false
  tags?: boolean;                     // true or false
  departmentId?: number;              // department ID
  isOnView?: boolean;                 // true or false
  artistOrCulture?: boolean;          // true or false
  medium?: string | string[];         // multiple values joined by "|" if array
  hasImages?: boolean;                // true or false
  geoLocation?: string | string[];    // multiple values joined by "|" if array
  dateBegin?: number;                 // must be used with dateEnd
  dateEnd?: number;                   // must be used with dateBegin
};