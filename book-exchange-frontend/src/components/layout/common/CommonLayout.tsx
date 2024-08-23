import { useState } from "react";
import Form from "../../common/Form";
import Notification from "../../common/Notification";
import ProfileCard from "../../common/ProfileCard";
import ModalForm from "../../common/Modal";
import DashboardWidget from "../../common/DashboardWidget";
// import Table from "../../common/Table";
import Button from "../../base/Button";
import BookCard from "../../BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
  imageUrl: string;
}

// interface TableProps {
//   headers: string[];
//   data: Book[];
//   onActionClick: (action: string, row: Book) => void;
// }

const CommonLayout = () => {
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData] = useState<Book[]>([
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      status: "Available",
      imageUrl: "https://example.com/great-gatsby.jpg",
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      status: "Checked Out",
      imageUrl: "https://example.com/1984.jpg",
    },
    {
      id: "3",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      status: "Available",
      imageUrl: "https://example.com/to-kill-a-mockingbird.jpg",
    },
  ]);

  const handleFormSubmit = (formData: { [key: string]: string }) => {
    console.log("Form Data:", formData);
  };

  const handleNotificationDismiss = () => {
    setNotificationVisible(false);
  };

  const handleProfileEdit = () => {
    console.log("Edit Profile");
  };

  const handleProfileDelete = () => {
    console.log("Delete Profile");
  };

  // const handleTableActionClick = (action: string, row: Book) => {
  //   console.log(`${action} action on`, row);
  // };

  const handleBookEdit = (book: Book) => {
    console.log("Edit Book:", book);
  };

  const handleBookDelete = (book: Book) => {
    console.log("Delete Book:", book);
  };
  return (
    <div className="space-y-10 p-6">
      {/* Form Example */}
      <section>
        <h2 className="text-xl font-bold mb-4">Form Example</h2>
        <Form onSubmit={handleFormSubmit} />
      </section>

      {/* Notification Example */}
      {notificationVisible && (
        <section>
          <h2 className="text-xl font-bold mb-4">Notification Example</h2>
          <Notification
            message="This is a success notification."
            variant="success"
            onDismiss={handleNotificationDismiss}
          />
        </section>
      )}

      {/* Profile Card Example */}
      <section>
        <h2 className="text-xl font-bold mb-4">Profile Card Example</h2>
        <ProfileCard
          name="John Doe"
          email="john.doe@example.com"
          status="active"
          onEdit={handleProfileEdit}
          onDelete={handleProfileDelete}
        />
      </section>

      {/* Modal Form Example */}
      <section>
        <h2 className="text-xl font-bold mb-4">Modal Form Example</h2>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Open Modal Form
        </Button>
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </section>

      {/* Dashboard Widget Example */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardWidget
          title="Books Borrowed"
          value="45"
          badgeText="Monthly"
          badgeVariant="success"
        />
        <DashboardWidget
          title="Books Returned"
          value="30"
          badgeText="Monthly"
          badgeVariant="warning"
        />
        <DashboardWidget
          title="Overdue Books"
          value="5"
          badgeText="Urgent"
          badgeVariant="danger"
        />
      </section>

      {/* Table Example */}
      {/* <section>
        <h2 className="text-xl font-bold mb-4">Table Example</h2>
        <Table
          headers={["Title", "Author", "Status"]}
          data={tableData}
          onActionClick={handleTableActionClick}
        />
      </section> */}

      {/* Book Card Example */}
      <section>
        <h2 className="text-xl font-bold mb-4">Book Card Example</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tableData.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={() => handleBookEdit(book)}
              onDelete={() => handleBookDelete(book)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommonLayout;
