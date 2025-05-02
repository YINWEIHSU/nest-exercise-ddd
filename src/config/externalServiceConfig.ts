import { get } from 'env-var';
import '../libs/utils/dotenv';

export const externalUrl = {
  apisix: {
    url: get('APISIX_URL').required().asUrlString(),
    sourceKey: get('APISIX_SOURCE_KEY').required().asString(),
  },
  masa: {
    url: get('MASA_URL').required().asUrlString(),
  },
};
