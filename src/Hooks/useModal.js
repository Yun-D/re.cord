import { useState } from "react";

/**
 * 모달 상태 관리를 위한 커스텀 훅
 *
 * @param {string[]} modalNames - 관리할 모달 이름들의 배열 (예: ['edit', 'input'])
 * @returns {object} { modals, openModal, closeModal, toggleModal, switchModal }
 *
 * @example
 * const { modals, openModal, closeModal, switchModal } = useModal(['edit', 'input']);
 * // modals = { edit: false, input: false }
 * // openModal('edit') - edit 모달 열기
 * // closeModal('edit') - edit 모달 닫기
 * // switchModal('edit', 'input') - edit 모달 닫고 input 모달 열기
 */
const useModal = (modalNames = []) => {
  // 초기 상태: 모든 모달을 false로 설정
  const initialState = modalNames.reduce((acc, name) => {
    acc[name] = false;
    return acc;
  }, {});

  const [modals, setModals] = useState(initialState);

  /**
   * 특정 모달 열기
   * @param {string} modalName - 열 모달 이름
   */
  const openModal = (modalName) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: true,
    }));
  };

  /**
   * 특정 모달 닫기
   * @param {string} modalName - 닫을 모달 이름
   */
  const closeModal = (modalName) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: false,
    }));
  };

  /**
   * 특정 모달 토글
   * @param {string} modalName - 토글할 모달 이름
   */
  const toggleModal = (modalName) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  /**
   * 한 모달을 닫고 다른 모달 열기 (모달 전환)
   * @param {string} closeName - 닫을 모달 이름
   * @param {string} openName - 열 모달 이름
   */
  const switchModal = (closeName, openName) => {
    setModals((prev) => ({
      ...prev,
      [closeName]: false,
      [openName]: true,
    }));
  };

  /**
   * 모든 모달 닫기
   */
  const closeAllModals = () => {
    setModals(initialState);
  };

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    switchModal,
    closeAllModals,
  };
};

export default useModal;
