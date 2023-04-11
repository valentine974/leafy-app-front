import "./NotFoundPage.css";

function NotFoundPage(props) {
  const {togglePage}=props
  return (
    <div className={`pageContainer ${togglePage}`}>
    <div className={`pageTitle ${togglePage}`}><h1>Page Not Found</h1></div>
    <div className="pageContent"><p>This page doesn't seem to exist</p></div>
    
      
      
    </div>
  );
}

export default NotFoundPage;
