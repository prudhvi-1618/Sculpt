# Generated by Django 5.0.6 on 2024-07-13 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_chat_name_alter_videocontent_context'),
    ]

    operations = [
        migrations.AlterField(
            model_name='videocontent',
            name='url',
            field=models.TextField(max_length=250),
        ),
    ]