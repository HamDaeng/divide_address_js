function Address_finder(address) {
  // 변수 초기화
  let first_data;
  let end_data;

  // 도로명 주소 체크 ( 도로명 주소 가이드에 의거하여 타겟을 정함 )
  let road_regexr =
    /(((로|길)+[ ]*[0-9]-*[0-9]*(\(|,|\[|\{| )+|[0-9]+-[0-9]+(\(|,|\[|\{| )*(번지| 번지)*)[ ]*)/g;
  let road_word = /[^\dA-Za-z가-힣 \(\),-.]/g;

  // 번지, 건물명이 안적혀있는 기형적인 주소 체크
  let num_regexr_lee = /[가-힣]+(리)\s/g;
  let num_regexr_dong = /[가-힣]+(동|읍|면)\s/g;

  // 정확한 index 값을 위한 정규표현식
  let clear_regexr = /(\(|\[|\{|,)/g;

  // 공용 변수값 초기화
  let change_string = "";
  let index_point = 0;

  try {
    // 도로명 주소에 적합하면 전처리하여 법정주소와 상세주소를 나눌 index 값을 가져옴
    if (road_regexr.test(address) == true) {
      change_string = String(
        address.match(road_regexr).filter((x) => Boolean(x))[0]
      )
        .replace(clear_regexr, "")
        .trim();

      index_point = Number(
        address.indexOf(change_string) + change_string.length
      );
    }
    // 도로명 주소에 적합하지 않으면 ~리 인지, ~동,읍,면 인지 체크
    else {
      // ~ 리 라면, ~리 기준으로 index를 지정
      if (num_regexr_lee.test(address) == true) {
        change_string = String(
          address.match(num_regexr_lee).filter((x) => Boolean(x))[0]
        )
          .replace(clear_regexr, "")
          .trim();

        index_point = Number(
          address.indexOf(change_string) + change_string.length
        );
      }
      // ~동,읍,면 이라면 ~동,읍,면 기준으로 index를 지정
      else {
        change_string = String(
          address.match(num_regexr_dong).filter((x) => Boolean(x))[0]
        )
          .replace(clear_regexr, "")
          .trim();

        index_point = Number(
          address.indexOf(change_string) + change_string.length
        );
      }
    }

    // 앞의 값(법정주소)과 뒤의 값(상세주소) 를 나누어서 저장
    first_data = String(address.slice(0, index_point))
      .replace(road_word, "")
      .trim();
    end_data = String(address.slice(index_point)).replace(road_word, "").trim();

    // 만약, 상세주소가 ' , ' 로 시작하면 제거
    if (end_data.indexOf(",") == 0 || end_data.indexOf(",") == 1) {
      end_data = end_data.replace(",", "").trim();
    }
  } catch (e) {
    // 오류 발생시 error,error 처리
    first_data = "error";
    end_data = "error";
  }

  // 값 리턴
  return { 법정주소: first_data, 상세주소: end_data };
}
