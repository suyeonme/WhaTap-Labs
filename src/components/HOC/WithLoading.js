import { Placeholder } from 'styles/styles';

function WithLoading(Component) {
  return function WihLoadingComponent({ dataObj, ...props }) {
    const { loading, error } = dataObj;

    if (loading) return <Placeholder>Loading...</Placeholder>;
    if (error) return <Placeholder>Error</Placeholder>;
    return <Component dataObj={dataObj} {...props} />;
  };
}
export default WithLoading;
