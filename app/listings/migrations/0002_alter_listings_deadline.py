# Generated by Django 4.0.5 on 2022-07-06 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listings',
            name='deadline',
            field=models.DateTimeField(null=True),
        ),
    ]
