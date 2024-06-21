import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  const Component = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = () => {
        return !!localStorage.getItem('admin');
      };

      if (!isLoggedIn()) {
        router.push('/administrator/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAdminAuth;
