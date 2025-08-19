import useFetch from "../hooks/useFetch";
export default function Advice() {
  const { isLoading, data } = useFetch(
    "https://korean-advice-open-api.vercel.app/api/advice"
  );

  return (
    <div>
      <h2>랜덤명언</h2>
      {!isLoading && (
        <>
          <div>{data.message}</div>
          <div>{data.author}</div>
        </>
      )}
    </div>
  );
}
