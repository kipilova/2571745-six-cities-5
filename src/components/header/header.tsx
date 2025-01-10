import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { AuthorizationStatus, AppRoute } from '../../const';
import { signOutAction } from '../../action';

function Header(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const userEmail = useSelector((state: RootState) => state.userEmail);
  // console.log("EMAIL:", userEmail);
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus,
  );
  const favoriteCount = useSelector(
    (state: RootState) => state.favoriteOffers.length,
  );

  const handleSignOut = () => {
    dispatch(signOutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      to={AppRoute.Favorites}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {userEmail}
                      </span>
                      <span className="header__favorite-count">
                        {favoriteCount}
                      </span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <button onClick={handleSignOut} className="header__signout">
                      <span className="header__signout">Sign out</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link
                    to={AppRoute.Login}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
