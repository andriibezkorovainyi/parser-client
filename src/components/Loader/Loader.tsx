import './Loader.scss';

export function Loader() {
  return (
    <div className="Loader" data-cy="loader">
      {/* <table className="table is-striped is-fullheight is-narrow is-fullwidth"> */}
      {/*  <tbody> */}
      {/*    {new Array(25).fill(0).map((_, i) => ( */}
      {/*      <tr key={i}> */}
      {/*        <td style={{ display: 'block', height: 25 }} /> */}
      {/*      </tr> */}
      {/*    ))} */}
      {/*  </tbody> */}
      {/* </table> */}
      <div className="Loader__content" />
    </div>
  );
}
