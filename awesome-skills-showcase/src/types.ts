export interface Plugin {
  name: string;
  description: string;
  source: string;
  category: string;
}

export interface MarketplaceData {
  name: string;
  version: string;
  description: string;
  owner: {
    name: string;
    email: string;
  };
  plugins: Plugin[];
}
