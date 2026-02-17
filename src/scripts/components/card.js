export const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export const deleteCard = (cardElement) => {
  cardElement.remove();
};

const getTemplate = () => {
  return document
    .getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export const createCardElement = (
  data,
  { onPreviewPicture, onLikeIcon, onDeleteCard, onInfoClick, userId }
) => {
  const cardElement = getTemplate();
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const infoButton = cardElement.querySelector(".card__control-button_type_info");
  const deleteButton = cardElement.querySelector(".card__control-button_type_delete");
  const cardImage = cardElement.querySelector(".card__image");
  const cardOwnerId = data.owner ? data.owner._id : null;
  const cardId = data._id;
  const isLikedByUser = data.likes
    ? data.likes.some((like) => like._id === userId)
    : false;

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  if (onLikeIcon) {
    if (likeCount) {
      likeCount.textContent = data.likes ? data.likes.length : 0;
    }
    if (isLikedByUser) {
      likeButton.classList.add("card__like-button_is-active");
    }
    likeButton.addEventListener("click", () => onLikeIcon(likeButton, cardId, likeCount));
  }

  if (cardOwnerId && userId && cardOwnerId !== userId) {
    deleteButton.remove();
  } else if (onDeleteCard) {
    deleteButton.addEventListener("click", () => onDeleteCard(cardElement, cardId));
  }

  if (infoButton && onInfoClick) {
    infoButton.addEventListener("click", () => onInfoClick(cardId));
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => onPreviewPicture({name: data.name, link: data.link}));
  }

  return cardElement;
};
