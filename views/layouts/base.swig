<!DOCTYPE html>
<html>
<head>
    <title>{% block pageTitle %}{% endblock %}</title>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

    <link rel="stylesheet" type="text/css" href="css/tool.min.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body class="{% block bodyClass %}{% endblock %}">

{% include '../components/header.swig' %}

<section class="{% block mainClass %}{% endblock %}">
    {% block content %}{% endblock %}
</section>

{% include '../components/footer.swig' %}

    <script type="text/javascript" src="js/tool.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>