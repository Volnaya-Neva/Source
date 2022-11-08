[API](https://github.com/Volnaya-Neva/Source/tree/master/Build/API)
Для работы требуется [net.Core7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
Настройки находятся в appsettings.json
Url и Port указываются в  "Url": "http://localhost:7096"
Запускать Q10.Pickpoint.API.exe
Далее перейти в http://localhost:7096/swagger/index.html
Данная апи умеет:
  Возвращать сгенерированные точки для того, чтобы UI
отрисовал их на карте. Это сделано по причине того, что не успели доделать
связь с ds.
  Получать на вход Exel файл с типами json-файлов и их использованием.(Для коректировок, перенесено в архив к примеру)
  Получать на вход каталог с GeoJson файлами скаченными из datamos.ru
обрабатывать их и записывать данные + координаты в базу данных. Что позволяет расширять и дополнять,
а так же обновлять данные о строениях.
  Выгрузка данных в csv карту. для общета ds модели.

К db MsSLQ Можно подключиться через [ssms](https://learn.microsoft.com/ru-RU/sql/ssms/download-sql-server-management-studio-ssms?azure-portal=true&view=sql-server-ver16)
Для входа:
  ip: 37.18.100.220
  user: rdsuser
  password: !!ZLoo!!
  db Q10
В базе находятся 3-е вида таблиц.
  DataMosRuType - в ней указаны номера json файлов, их тип(Жилые дома, спортивные комплексы, архивы и прочее), а так же указано, используется ли этот json или нет.
  DataMosRuSource - в ней находтся данные по обработанным json-файлам. адреса, название объектов и прочего.
  Coordinates - доп таблица (для DataMosRuSource) в ней указаны координаты объектов.



[UI](https://github.com/Volnaya-Neva/Source/tree/master/Build/UI)
Настройки находятся в .env
Для подключения к API используется REACT_APP_PICKPOINT_BASE_URL=http://localhost:7096
Для указания порта, PORT=7099, для хоста HOST=localhost
Для запуска может потребоваться установить npm
Необходимо выполнить команду npm i, для подгрузки зависимостей
Далее выполнить npm start
Далее перейти http://localhost:7099

