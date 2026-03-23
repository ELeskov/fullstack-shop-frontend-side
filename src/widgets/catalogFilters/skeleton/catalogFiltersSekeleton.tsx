import ContentLoader from 'react-content-loader'

export function CatalogFiltersSkeleton() {
  return (
    <ContentLoader
      speed={2}
      height={46}
      width={1440}
      viewBox="0 0 1440 46"
      backgroundColor="#969696"
      foregroundColor="#b5b5b5"
    >
      <rect x="5" y="5" rx="8" ry="8" width="173" height="36" />
      <rect x="200" y="5" rx="8" ry="8" width="116" height="36" />
      <rect x="338" y="5" rx="8" ry="8" width="138" height="36" />
      <rect x="498" y="5" rx="8" ry="8" width="107" height="36" />
      <rect x="627" y="5" rx="8" ry="8" width="96" height="36" />
      <rect x="743" y="5" rx="8" ry="8" width="695" height="36" />
    </ContentLoader>
  )
}
