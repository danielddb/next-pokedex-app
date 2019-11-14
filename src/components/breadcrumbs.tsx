import MaterialBreadcrumbs from '@material-ui/core/Breadcrumbs';
import MaterialLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
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
  const breadcrumbText =
    `/${url}` === router.pathname ? (
      <Typography color="textPrimary">
        {wildcardValue
          ? toTitleCase(router.query[wildcardValue])
          : toTitleCase(currentPart)}
      </Typography>
    ) : (
      <Link href={`/${url}`} passHref>
        <MaterialLink color="inherit">
          {wildcardValue
            ? toTitleCase(router.query[wildcardValue])
            : toTitleCase(currentPart)}
        </MaterialLink>
      </Link>
    );
  const breadcrumbItem = (
    <div data-testid="breadcrumb-item" key={url}>
      {breadcrumbText}
    </div>
  );

  if (parts.length === 1) {
    return [breadcrumbItem];
  }

  return [...buildBreadcrumb(nextUrl, router), breadcrumbItem];
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
