import router from 'next/router';
import React from 'react';
import Breadcrumb from '../utils/breadcrumb';

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps): JSX.Element => {
  const crumbsCopy = [...breadcrumbs];
  const last = crumbsCopy.pop();

  return (
    <div className="text-sm font-light text-gray mb-4">
      {(crumbsCopy ?? []).map((breadcrumb) => {
        return (
          <React.Fragment key={breadcrumb.name}>
            <a
              className="underline hover:text-purple-darkest cursor-pointer"
              onClick={() =>
                breadcrumb.path === 'back'
                  ? router.back()
                  : router.push(breadcrumb.path)
              }
            >
              {breadcrumb.name}
            </a>

            {' / '}
          </React.Fragment>
        );
      })}
      {last ? <span>{last.name}</span> : null}
    </div>
  );
};

export default Breadcrumbs;
