import { useSelector, useDispatch } from 'react-redux';

import CitySelect from '../../components/CitySelect';

function Home () {
  return (
    <>
      <section className="section">
        <div className="container">
          <h3 className="title is-3">Find places in</h3>
          <CitySelect />
        </div>
      
        <div className="container">
          <h3 className="title is-3">Filters</h3>
        </div>
      </section>
    </>
  );
};

export default Home;
