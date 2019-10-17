import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import MaterialBreadcrumbs from '@material-ui/core/Breadcrumbs';
import MaterialLink from '@material-ui/core/Link';
import { toTitleCase } from '../utils/text';

function buildBreadcrumb(url: string, router: any): any[] {
  const nextUrl = url
    .split('/')
    .slice(0, -1)
    .join('/');
  const parts = url.split('/'); // ['pokemon', '[part]']
  const currentPart = parts[parts.length - 1]; // '[part]'
  const wildcardMatch = currentPart.match(/^\[(.+)]$/); // [ ['part'], 'part' ]
  const wildcardValue = wildcardMatch && wildcardMatch[1]; // 'part'

  const component =
    `/${url}` === router.pathname ? (
      <Typography key={url} color="textPrimary">
        {wildcardValue
          ? toTitleCase(router.query[wildcardValue])
          : toTitleCase(currentPart)}
      </Typography>
    ) : (
      <Link key={url} href={`/${url}`} passHref>
        <MaterialLink color="inherit">
          {wildcardValue
            ? toTitleCase(router.query[wildcardValue])
            : toTitleCase(currentPart)}
        </MaterialLink>
      </Link>
    );

  if (parts.length === 1) {
    return [component];
  }

  return [...buildBreadcrumb(nextUrl, router), component];
}

const Breadcrumbs = () => {
  const router = useRouter();
  const pathname = router.pathname
    .split('/')
    .slice(1)
    .join('/');

  return (
    <MaterialBreadcrumbs aria-label="breadcrumb">
      {buildBreadcrumb(pathname, router)}
    </MaterialBreadcrumbs>
  );
};

export default Breadcrumbs;
