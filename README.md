 # 나만의 앨범창고

내가 좋아하는 앨범을 선정하고 이를 탑스터화해서 보여주는 프로젝트!

## 🎶왜 만들게 되었나요?
우리나라에는 이상하게 탑스터를 만드는 사이트가 존재하지 않습니다. 존재하더라도 그렇게 괜찮은(?) UI/UX를 가진 사이트는 아니였어요. 그래서 그런 사이트를 내가 만들어보는건 어떨까 싶어서 만들어보게 되었습니다.

## 🎶개발 환경 구축을 위해 사용한 라이브러리, 프레임워크

### React
동적인 페이지 전환과 컴포넌트 재사용성이 높은 리액트를 SPA 라이브러리로 선택하게 되었습니다.

### Redux-Toolkit
사용자의 앨범과 탑스터 정보를 전역상태로 관리해줄 필요성이 있었습니다. 따라서 전역상태관리 라이브러리를 도입하였고, 그중 Flux 패턴을 기반으로 안정적인 상태관리가 가능한 Redux-Toolkit을 선택하게 되었습니다.

### Redux-Thunk
리덕스 툴킷내에서 서버자원을 관리하기 때문에 RTK와 궁합이 좋은 Redux-Thunk를 서버자원관리 라이브러리로써 선택하게 되었습니다.


## 🎶시연영상
![ezgif com-gif-maker](https://user-images.githubusercontent.com/52379503/211949937-1c60947e-1b22-4751-853d-a0a1a6f1b3d4.gif)

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/52379503/211949944-aef24577-e003-41fd-a17e-89a802508d62.gif)

## 🎶탑스터 이미지

아래사진은 탑스터를 쪄낸 결과물! html2canvas를 통해 탑스터를 이미지화하여 사용자에게 전달해줍니다.

![topster1](https://user-images.githubusercontent.com/52379503/211947528-173e90bc-36c1-49d8-b7bf-0e90b9f2bdae.jpg)
