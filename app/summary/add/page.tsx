import AddPost from "./_components/add-post";

const SummaryAddPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="pt-[100px] pb-[40px] text-center">
        <h1 className="font-bold text-[25px]">Add Article</h1>
        <p>Please write your good article!</p>
      </div>
      <AddPost />
    </div>
  );
};

export default SummaryAddPage;
