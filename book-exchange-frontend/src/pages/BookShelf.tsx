import BookShelfMain from "../components/bookshelf/BookShelfMain";
import MainLayout from "../components/layout/MainLayout";

export default function BookShelf() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <Banner />
        <div className="flex flex-row">
          <div>
            <SearchArea />
            <BookShelfMain />
            <Pagination />
          </div>
          <div>
            <ContactDev />
            <BookHighLight />
            <HistorySearch />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const Banner = () => {
  return <div>Banner</div>;
};

const SearchArea = () => {
  return <div>SearchArea</div>;
};

const ContactDev = () => {
  return <div>ContactDev</div>;
};

const BookHighLight = () => {
  return <div>BookHighLight</div>;
};

const HistorySearch = () => {
  return <div>HistorySearch</div>;
};

const Pagination = () => {
  return <div>HistorySearch</div>;
};
