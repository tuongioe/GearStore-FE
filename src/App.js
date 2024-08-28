import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { getUserCart } from './redux/cartSlice';
import { getUser } from './redux/userSlice';
import * as ROUTES from './constants/routes';
import AddCardAction from './pages/ProfilePage/components/ProfileRight/components/AddCard/action';
import EditInfoAction from './pages/ProfilePage/components/ProfileRight/components/EditInfo/action';
import { action as LoginAction } from './pages/LoginPage/action';
import { action as SignupAction } from './pages/SignUpPage/action';
import { loader as BrandLoader } from './pages/ProductsPageLayout/loader';
import { loader as ProductLoader } from './pages/ProductsPageLayout/components/ProductsMain/loader';
import { loader as ProductDetailLoader } from './pages/ProductDetailPage/loader';
import { loader as HomePageLoader } from './pages/HomePage/loader';
import { loader as OrdersPageLoader } from './pages/ProfilePage/components/ProfileRight/components/Orders/loader';
import { loader as AdminProductsLoader } from './pages/Admin/AdminProducts/loader';
import { loader as AdminOrdersLoader } from './pages/Admin/AdminOrders/loader';
import { loader as CheckoutPageLoader } from './pages/PaymentPage/loader';
import getAuthToken from './services/getToken';

const Layout = lazy(() => import('./pages/Layout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPageLayout = lazy(() => import('./pages/ProductsPageLayout'));
const ProductsMain = lazy(() =>
  import('./pages/ProductsPageLayout/components/ProductsMain')
);
const ProductDetail = lazy(() => import('./pages/ProductDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ProfileRight = lazy(() =>
  import('./pages/ProfilePage/components/ProfileRight')
);
const AddCard = lazy(() =>
  import('./pages/ProfilePage/components/ProfileRight/components/AddCard')
);
const EditInfo = lazy(() =>
  import('./pages/ProfilePage/components/ProfileRight/components/EditInfo')
);
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ShippingPage = lazy(() => import('./pages/ShippingPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const OrdersPage = lazy(() =>
  import('./pages/ProfilePage/components/ProfileRight/components/Orders')
);
const AdminOrders = lazy(() => import('./pages/Admin/AdminOrders'));
const AdminProducts = lazy(() => import('./pages/Admin/AdminProducts'));
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const ErrorPage = lazy(() => import('./pages/Error'));
const token = getAuthToken();

const router = createBrowserRouter([
  {
    path: `${ROUTES.HOME}`,
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <Layout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <HomePage />
          </Suspense>
        ),
        loader: HomePageLoader,
      },
      {
        path: `${ROUTES.LOGIN}`,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <LoginPage />
          </Suspense>
        ),
        loader: () => {
          if (token) {
            return redirect(ROUTES.HOME);
          }
          return null;
        },
        action: LoginAction,
      },
      {
        path: `${ROUTES.SIGNUP}`,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SignUpPage />
          </Suspense>
        ),
        loader: () => {
          if (token) {
            return redirect(ROUTES.HOME);
          }
          return null;
        },
        action: SignupAction,
      },
      {
        path: `${ROUTES.CART}`,
        loader: () => {
          if (!token) {
            return redirect(ROUTES.LOGIN);
          }
          return null;
        },
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <CheckoutPage />
              </Suspense>
            ),
          },
          {
            path: `${ROUTES.SHIPPING}`,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ShippingPage />
              </Suspense>
            ),
            loader: CheckoutPageLoader,
          },
          {
            path: `${ROUTES.PAYMENTMETHOD}`,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PaymentPage />
              </Suspense>
            ),
            loader: CheckoutPageLoader,
          },
          {
            path: `${ROUTES.PAYMENTSUCCESS}`,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PaymentSuccess />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: `${ROUTES.PROFILE}`,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProfilePage />
          </Suspense>
        ),
        loader: () => {
          if (!token) {
            return redirect(ROUTES.LOGIN);
          }
          return null;
        },
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ProfileRight />
              </Suspense>
            ),
          },
          {
            path: 'edit-info',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <EditInfo />
              </Suspense>
            ),
            action: EditInfoAction,
          },
          {
            path: 'add-address',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AddCard />
              </Suspense>
            ),
            action: AddCardAction,
          },
          {
            path: 'orders',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <OrdersPage />
              </Suspense>
            ),
            loader: OrdersPageLoader,
          },
        ],
      },
      {
        path: `${ROUTES.PRODUCTDETAIL}`,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProductDetail />
          </Suspense>
        ),
        loader: ProductDetailLoader,
      },
      {
        path: ':categoryName',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsPageLayout />
          </Suspense>
        ),
        loader: BrandLoader,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ProductsMain />
              </Suspense>
            ),
            loader: ProductLoader,
          },
          {
            path: ':brandName',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ProductsMain />
              </Suspense>
            ),
            loader: ProductLoader,
          },
        ],
      },
    ],
  },
  {
    path: `${ROUTES.ADMIN}`,
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <AdminLayout />
      </Suspense>
    ),
    loader: AdminProductsLoader,
    children: [
      {
        path: '/admin/products',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <AdminProducts />
          </Suspense>
        ),
        loader: AdminProductsLoader,
      },
      {
        path: '/admin/orders',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <AdminOrders />
          </Suspense>
        ),
        loader: AdminOrdersLoader,
      },
    ],
  },
]);
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCart());
    dispatch(getUser());
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
