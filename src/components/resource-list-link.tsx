import React from 'react';
import { resourceListUrlParser } from '../utils/api';
import ButtonLink from './button-link';

interface Props {
  url: string | null;
}

const ResourceListLink: React.FC<Props> = ({ url, children, ...rest }) => {
  const parsedUrl = url && resourceListUrlParser(url);
  const pathname = parsedUrl ? `/${parsedUrl.resource}` : '/';
  const pageLimit = parsedUrl ? `${parsedUrl.pageLimit}` : '';
  const offset = parsedUrl ? `${parsedUrl.offset}` : '';

  return (
    <ButtonLink
      {...rest}
      href={{
        pathname,
        query: {
          offset,
          pageLimit
        }
      }}
      disabled={!parsedUrl}
    >
      {children}
    </ButtonLink>
  );
};

export default ResourceListLink;
