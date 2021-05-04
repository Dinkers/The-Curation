import CitySelect from '../../components/CitySelect';

function Home () {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="block">
            <h3 className="title is-4">Find places in</h3>
            <CitySelect />
          </div>

          <h3 className="title is-4">Filters</h3>
        </div>
      </section>
    </>
  );
};

export default Home;
