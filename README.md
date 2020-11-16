## Custom Chartmuseum-ui

 - Dashboard : 현재 존재하는 helm 차트 리스트를 카드형태로 디스플레이
 - Deatail : helm 차트의 상세 내역, 버전, 생성날짜 등을 확인할 수 있고 삭제도 가능
 - Framework : express.js, bootstrap4(adminLTE3) + jquery

## Usage
 
- 프로젝트 세팅: _env 파일에 있는 PORT(서비스가 사용하는 포트), BACKEND_API_URL(chartmuseum 백엔드 url)을 설정

 - Dashboard 화면
 ![1](https://user-images.githubusercontent.com/37721713/91919265-503a4380-ed00-11ea-8e55-42901f55d533.PNG)
 
 ```
 대시보드에서는 현재 배포중인 helm 차트의 목록을 확인할 수 있음
 ```

 - Detail 화면
 ![2](https://user-images.githubusercontent.com/37721713/91919267-516b7080-ed00-11ea-95fe-8ea24df613fd.PNG)

```
디테일화면에서는 helm 차트의 이름을 바탕으로 version 정보 등을 테이블 형태로 확인가능
row단위 삭제 및 multi 삭제도 가능
```
