import React, { useState, useEffect } from "react";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { fetchWishes } from "../firebase/firestore/wishesCRUD";
import WishCard from "../Components/WishCard";
import FloatingButton from "../Components/FloatingButton";
import { ReactComponent as IcnEdit } from "../Assets/edit.svg";
import { getCurrentUserId } from "../firebase/auth";

const Wish = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [wishes, setWishes] = useState([]);

  const userId = getCurrentUserId();

  const loadUserWishes = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await fetchWishes(userId);

      if (data.length > 0) {
        setIsEmpty(false);
        setWishes(data);
      } else {
        setWishes([]);
      }
    } catch (error) {
      console.error("Error fetching wish: ", error);
      setIsEmpty(true);
      setWishes([]);
    } finally {
      setLoading(false);
    }
  };

  // 메모 삭제 후 메모 리스트 다시 불러오기
  const handleDeleteSuccess = () => {
    loadUserWishes();
  };

  useEffect(() => {
    loadUserWishes();
  }, [userId]);

  if (loading) return <div>로딩중...</div>;
  return (
    <div>
      <h2 className="no-margin">위시</h2>

      {isEmpty ? (
        <div className="container">
          <div className="content-align">
            <p>
              저장된 위시가 없어요.
              <br />
              만들어볼까요?
            </p>
            <Link to="/addPin" state={{ isWish: true }}>
              <Button>위시 등록하기</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "10px" }}>
          {wishes.map((wish) => (
            <WishCard
              key={wish.wishId}
              wishId={wish.wishId}
              place_name={wish.place_name}
              pinDesc={wish.pinDesc}
              address={wish.address}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ))}
        </div>
      )}

      <Link to="/addPin" state={{ isWish: true }}>
        <FloatingButton>
          <IcnEdit />
        </FloatingButton>
      </Link>
    </div>
  );
};

export default Wish;
