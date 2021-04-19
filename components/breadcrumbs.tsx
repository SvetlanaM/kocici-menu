import Link from 'next/link';
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
            <Link key={key} href={breadcrumb.path}>
              <a className="underline hover:text-purple-darkest">
                {breadcrumb.name}
              </a>
            </Link>
            {' / '}
          </>
        );
      })}
      {last ? <span>{last.name}</span> : null}
    </div>
  );
};

export default Breadcrumbs;
