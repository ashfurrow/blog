import PageContext from './PageContext'
import PageResources from './PageResources'
import Data from './Data'

interface PageProps {
  data: Data
  location: Location
  pageResources?: PageResources
  pageContenxt: PageContext
}

export default PageProps
