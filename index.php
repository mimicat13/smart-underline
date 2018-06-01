<?php
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>smart underline</title>
    <style>
        body {
            background: teal;
        }

        .tabs {
            position: relative;
            font-size: 18px;
            line-height: 44px;
            z-index: 1;
            padding-left: 25px;
            margin-bottom: 0px;
        }

        .tabs .tab {
            cursor: pointer;
            padding-left: 12px;
            padding-right: 12px;
            margin-right: 50px;
            outline: none;
            border: 1px solid white;
        }

        .tabs .tab span {
            border: 1px solid white;
        }

        .tabs-clear li {
            border: 1px solid white;
        }

    </style>
    <script src="https://code.jquery.com/jquery-2.2.4.js"></script>

    <script src="smartUnderline.js?t=s<?php echo rand(); ?>"></script>
</head>
<body style="background:teal;">

<div style="text-align: center;">
    <ul class="tabs">
        <li class="tab"><span>AAAAAA</span></li>
        <li class="tab"><span>BBBBBBBBBB</span></li>
        <li class="tab"><span>ccc</span></li>
    </ul>
</div>

<div style="text-align: center;">
    <ul class="tabs-clear">
        <li>XXXXXX</li>
        <li>YYYYYYYYYYYYY</li>
        <li>ZZZZZ</li>
    </ul>
</div>

<div class="dest">destroy</div>
<div class="init">init</div>

<script>
  $(document).ready(function() {
    function initTabs() {
      $('.tabs').smartUnderline({
        active: 1,
        hideOn: '768px',
        marginLeft: '12px',
        callback: function(item) {
          console.log(
              'callback(' + $(item).data('id') + ')'
          );
        },
      });

      $('.tabs-clear').smartUnderline({
        hideOn: '768px',
        bottom: '-5px',
        callback: function(item) {
          console.log(
              'callback(' + $(item).data('id') + ')'
          );
        },
      });
    }

    initTabs();

    $('.dest').click(function() {
      $('.tabs').smartUnderline('destroy');
      $('.tabs-clear').smartUnderline('destroy');
    });

    $('.init').click(function() {
      initTabs();
    });
  });

</script>
</body>
</html>
