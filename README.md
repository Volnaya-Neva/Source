[API](https://github.com/Volnaya-Neva/Source/tree/master/Build/API)<br/>
Для работы требуется [net.Core7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)<br/>
Настройки находятся в appsettings.json<br/>
Url и Port указываются в  "Url": "http://localhost:7096"<br/>
Запускать Q10.Pickpoint.API.exe<br/>
Далее перейти в http://localhost:7096/swagger/index.html<br/>
Данная апи умеет:<br/>
  Возвращать сгенерированные точки для того, чтобы UI<br/>
отрисовал их на карте. Это сделано по причине того, что не успели доделать<br/>
связь с ds.<br/>
  Получать на вход Exel файл с типами json-файлов и их использованием.(Для коректировок, перенесено в архив к примеру)<br/>
  Получать на вход каталог с GeoJson файлами скаченными из datamos.ru<br/>
обрабатывать их и записывать данные + координаты в базу данных. Что позволяет расширять и дополнять,<br/>
а так же обновлять данные о строениях.<br/>
  Выгрузка данных в csv карту. для общета ds модели.<br/>

К db MsSLQ Можно подключиться через [ssms](https://learn.microsoft.com/ru-RU/sql/ssms/download-sql-server-management-studio-ssms?azure-portal=true&view=sql-server-ver16)<br/>
Для входа:<br/>
  ip: 37.18.100.220<br/>
  user: rdsuser<br/>
  password: !!ZLoo!!<br/>
  db Q10<br/>
В базе находятся 3-е вида таблиц.<br/>
  DataMosRuType - в ней указаны номера json файлов, их тип(Жилые дома, спортивные комплексы, архивы и прочее), а так же указано, используется ли этот json или нет.<br/>
  DataMosRuSource - в ней находтся данные по обработанным json-файлам. адреса, название объектов и прочего.<br/>
  Coordinates - доп таблица (для DataMosRuSource) в ней указаны координаты объектов.<br/>



[UI](https://github.com/Volnaya-Neva/Source/tree/master/Build/UI)<br/>
Настройки находятся в .env<br/>
Для подключения к API используется REACT_APP_PICKPOINT_BASE_URL=http://localhost:7096<br/>
Для указания порта, PORT=7099, для хоста HOST=localhost<br/>
Для запуска может потребоваться установить npm<br/>
Необходимо выполнить команду npm i, для подгрузки зависимостей<br/>
Далее выполнить npm start<br/>
Далее перейти http://localhost:7099<br/>

