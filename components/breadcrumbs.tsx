import Link from 'next/link';
import router from 'next/router';
import Breadcrumb from '../utils/breadcrumb';

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const crumbsCopy = [...breadcrumbs];
  const last = crumbsCopy.pop();

  return (
    <div className="text-sm font-light text-gray mb-4">
      {(crumbsCopy ?? []).map((breadcrumb, key) => {
        return (
          <>
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
          </>
        );
      })}
      {last ? <span>{last.name}</span> : null}
    </div>
  );
};

export default Breadcrumbs;
