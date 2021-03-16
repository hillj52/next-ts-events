import Header from './header';

const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <main>
      {children}
    </main>
  </>
);

export default Layout;