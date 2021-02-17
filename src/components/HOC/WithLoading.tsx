import React, { ComponentType } from 'react';
import { Placeholder } from 'styles/styles';
import { DataState } from 'types/types';

interface WithLoadingProps {
  dataObj: DataState;
}

function WithLoading<P extends object>(
  Component: ComponentType<P>
): React.FC<P & WithLoadingProps> {
  return function WihLoadingComponent({ dataObj, ...props }: WithLoadingProps) {
    const { loading, error } = dataObj;
    // Display an error with response.status

    if (loading) {
      return <Placeholder>Loading...</Placeholder>;
    }
    if (error !== '') {
      return <Placeholder>Request faild. Please try again.</Placeholder>;
    }
    return <Component dataObj={dataObj} {...(props as P)} />;
  };
}

export default WithLoading;
