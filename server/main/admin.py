from django.contrib import admin

from main.models import City, Place, Submission, PlaceImage, PlaceOpeningHours, PlaceUSP, PlaceVitalInfo


class PlaceImageInline(admin.TabularInline):
    model = PlaceImage


class PlaceOpeningHoursInline(admin.TabularInline):
    model = PlaceOpeningHours


class PlaceUSPInline(admin.TabularInline):
    model = PlaceUSP


class PlaceVitalInfoInline(admin.TabularInline):
    model = PlaceVitalInfo


class PlaceAdmin(admin.ModelAdmin):
    inlines = [
        PlaceImageInline,
        PlaceOpeningHoursInline,
        PlaceUSPInline,
        PlaceVitalInfoInline
    ]


admin.site.register(City)
admin.site.register(Submission)

admin.site.register(Place, PlaceAdmin)
admin.site.register(PlaceImage)
