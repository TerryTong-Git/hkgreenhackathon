# Generated by Django 4.0.5 on 2022-07-09 00:17

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('listings', '0006_alter_listings_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listings',
            name='contributors',
        ),
        migrations.AddField(
            model_name='listings',
            name='contributors',
            field=models.ManyToManyField(null=True, related_name='user_listings', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='listings',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
