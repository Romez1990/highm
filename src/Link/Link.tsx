import React, { forwardRef, Ref, AnchorHTMLAttributes } from 'react';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';

type NextComposedProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  NextLinkProps;

const NextComposed = forwardRef<HTMLAnchorElement, NextComposedProps>(
  (
    {
      as,
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      ...props
    }: NextComposedProps,
    ref,
  ) => (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a ref={ref} {...props} />
    </NextLink>
  ),
);

interface LinkPropsBase {
  activeClassName?: string;
  innerRef?: Ref<HTMLAnchorElement>;
  naked?: boolean;
}

export type LinkProps = LinkPropsBase &
  NextComposedProps &
  Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link({
  href,
  activeClassName = 'active',
  className: classNameProps,
  innerRef,
  naked,
  ...props
}: LinkProps): JSX.Element {
  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...props}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href as string}
      {...props}
    />
  );
}

export default forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link {...props} innerRef={ref} />
));
