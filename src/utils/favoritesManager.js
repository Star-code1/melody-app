/**
 * Tiện ích quản lý trạng thái yêu thích xuyên suốt ứng dụng
 */

// Thông báo cho tất cả các trang rằng danh sách yêu thích đã thay đổi
export const notifyFavoritesChanged = () => {
  // Cập nhật localStorage với timestamp mới
  localStorage.setItem('favoritesUpdated', new Date().getTime().toString());
  
  // Kích hoạt sự kiện storage để các tab khác nhận biết
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'favoritesUpdated',
    newValue: new Date().getTime().toString(),
  }));
};

// Thêm bài hát vào danh sách yêu thích
export const addToFavorites = async (songId, userId) => {
  try {
    const response = await fetch('http://localhost:5000/api/songs/liked', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ songId, userId })
    });
    
    if (!response.ok) {
      throw new Error('Failed to add song to favorites');
    }
    
    notifyFavoritesChanged();
    return true;
  } catch (error) {
    console.error('Error adding song to favorites:', error);
    return false;
  }
};

// Xóa bài hát khỏi danh sách yêu thích
export const removeFromFavorites = async (songId, userId) => {
  try {
    const response = await fetch('http://localhost:5000/api/songs/liked', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ songId, userId })
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove song from favorites');
    }
    
    notifyFavoritesChanged();
    return true;
  } catch (error) {
    console.error('Error removing song from favorites:', error);
    return false;
  }
};

// Kiểm tra xem bài hát có trong danh sách yêu thích không
export const checkIsFavorite = async (songId, userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/songs/liked?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }
    
    const data = await response.json();
    const likedSongIds = data.map(song => song._id);
    return likedSongIds.includes(songId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};
